const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    //assert
    assert(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const ExpectedValue = "10";
    const transactionResponse = await simpleStorage.store(ExpectedValue);
    await transactionResponse.wait();

    const updateValue = await simpleStorage.retrieve();
    assert(updateValue.toString(), ExpectedValue);
  });

  it("Should add person when we call addPerson", async () => {
    const PersonAdded = await simpleStorage.addPerson("Guru", 10);
    const expectedValue = "10";
    const result = await simpleStorage.getPerson("Guru");
    assert.equal(result.toString(), expectedValue);
  });
});
