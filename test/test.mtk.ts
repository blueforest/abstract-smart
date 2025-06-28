import { expect, assert } from "chai";
import { ethers,deployments,network,getNamedAccounts } from "hardhat";

describe("MyToken", function () {
    let myTokenContract: any;
    let owner: any;
    let user0: any;
    let _user2: any;
    let contractAddress: any;
    beforeEach(async () => {
        await deployments.fixture(["MyToken"]);
        const {deployer,user,user2} = await getNamedAccounts();
        owner = deployer;
        user0 = user;
        _user2 = user2;
        const deployment = await deployments.get("MyToken");
        myTokenContract = await ethers.getContractAt("MyToken",deployment.address);
        contractAddress = await myTokenContract.getAddress();
    });
    
    it("should Max supply reached",async()=>{
      for(let i = 1; i < 10; i++){
        const tx = await myTokenContract.safeMint({value: ethers.parseEther("0.01")});
        await tx.wait();
      }
      await expect(myTokenContract.safeMint({value: ethers.parseEther("0.01")})).to.be.revertedWith("Max supply reached");
    });

    it("should Insufficient balance",async()=>{
      await expect(myTokenContract.safeMint({value: ethers.parseEther("0.0001")}))
      .to.be.revertedWith("Insufficient balance");
    });


    it("should return correct balanceOf",async()=>{
      for(let i = 1; i < 5; i++){ 
        const tx = await myTokenContract.safeMint({value: ethers.parseEther("0.01")});
        await tx.wait();
      }
      const tokenURI = await myTokenContract.balanceOf(owner);
      await expect(tokenURI).to.equal(4);
    });


    it("should return correct tokensOfOwner",async()=>{
      
      // 给owner mint 1个
      const tx = await myTokenContract.safeMint({value: ethers.parseEther("0.01")});
      await tx.wait();

      // 给user0 mint 1个
      const ethersUser0 = await ethers.getSigner(user0);
      const tx2 = await myTokenContract.connect(ethersUser0).safeMint({value: ethers.parseEther("0.01")});
      await tx2.wait();

      // 给owner 再次 mint 1个
      const tx1 = await myTokenContract.safeMint({value: ethers.parseEther("0.01")});
      await tx1.wait();

      const tokenURI = await myTokenContract.tokensOfOwner(owner);
    
      await expect(tokenURI).to.deep.equal([1,3]);

      const tokenURI2 = await myTokenContract.tokensOfOwner(user0);
      await expect(tokenURI2).to.deep.equal([2]);
    });

    it("should transferFrom success",async()=>{
  
      const ethersUser0 = await ethers.getSigner(user0);
      const tx2 = await myTokenContract.connect(ethersUser0).safeMint({value: ethers.parseEther("0.01")});
      await tx2.wait();

      const tx3 = await myTokenContract.connect(ethersUser0).safeTransferFrom(user0,_user2,1);
      await tx3.wait();
      const tokenURI = await myTokenContract.balanceOf(user0);
      await expect(tokenURI).to.equal(0);

      const tokenURI2 = await myTokenContract.balanceOf(_user2);
      await expect(tokenURI2).to.equal(1);
    });

    it("should approve success",async()=>{
      const ethersUser0 = await ethers.getSigner(user0);
      const tx2 = await myTokenContract.connect(ethersUser0).safeMint({value: ethers.parseEther("0.01")});
      await tx2.wait();

      const tx3 = await myTokenContract.connect(ethersUser0).approve(_user2,1);
      await tx3.wait();

      const tokenURI = await myTokenContract.getApproved(1);
      await expect(tokenURI).to.equal(_user2);
    });

    it("should burn success",async()=>{
      const ethersUser0 = await ethers.getSigner(user0);
      const tx2 = await myTokenContract.connect(ethersUser0).safeMint({value: ethers.parseEther("0.01")});
      await tx2.wait();


      const tx3 = await myTokenContract.connect(ethersUser0).safeMint({value: ethers.parseEther("0.01")});
      await tx3.wait()

      
      await myTokenContract.connect(ethersUser0).burn(1);


      const tokenURI = await myTokenContract.balanceOf(user0);
      await expect(tokenURI).to.equal(1);
      
    });

    it("should pause success",async()=>{
      const tx3 = await myTokenContract.pause();
      await tx3.wait();
      await expect( myTokenContract.safeMint({value: ethers.parseEther("0.01")}))
      .to.be.revertedWithCustomError(myTokenContract,"EnforcedPause");
    });

    it("should unpause success",async()=>{

      const tx = await myTokenContract.pause();
      await tx.wait();
      await expect( myTokenContract.safeMint({value: ethers.parseEther("0.01")}))
      .to.be
      .revertedWithCustomError(myTokenContract,"EnforcedPause");

      const tx3 = await myTokenContract.unpause();
      await tx3.wait();
      await myTokenContract.safeMint({value: ethers.parseEther("0.01")});

      const tokenURI = await myTokenContract.balanceOf(owner);
      await expect(tokenURI).to.equal(1);

    });

     it("should withdraw failed",async()=>{
      const ethersUser0 = await ethers.getSigner(user0);
      await expect(myTokenContract.connect(ethersUser0).withdraw())
      .to.be.revertedWithCustomError(myTokenContract,"OwnableUnauthorizedAccount");
     });

    it("should withdraw success",async()=>{

       const ownerBalanceStart = await ethers.provider.getBalance(owner);
      console.log("balance start", ethers.parseEther(ownerBalanceStart.toString()));

      const ethersUser0 = await ethers.getSigner(user0);
      const tx2 = await myTokenContract.connect(ethersUser0)
      .safeMint({value: ethers.parseEther("0.05")});
      await tx2.wait();

      // const tx3 = await myTokenContract.connect(ethersUser0)
      // .safeMint({value: ethers.parseEther("0.05")});
      // await tx3.wait();

      const tx = await myTokenContract.withdraw();
      const withdrawReceipt = await tx.wait();
      const gasUsed = withdrawReceipt.gasUsed * withdrawReceipt.gasPrice;
      console.log("gasUsed",gasUsed);
      // await tx.wait();

      // 获取合约的余额
      const ownerBalanceAfter = await ethers.provider.getBalance(owner);
      console.log("balance after", ethers.parseEther(ownerBalanceAfter.toString()));

      // console.log("ownerBalanceStart + ethers.parseEther('0.05')",ownerBalanceStart + ethers.parseEther("0.05")- BigInt(gasUsed));
      await expect(ownerBalanceAfter).to.greaterThanOrEqual(ownerBalanceStart + ethers.parseEther("0.05") - BigInt(gasUsed));
      // await expect(balance).to.equal(0.06);
    });
    
    


 
})