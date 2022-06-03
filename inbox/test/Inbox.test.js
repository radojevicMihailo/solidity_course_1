const assert = require('assert');
const ganache = require('ganache-cli');  // LOCAL NETWORK
const Web3 = require('web3'); // CONSTRUCTOR
const provider = ganache.provider();
const web3 = new Web3(provider); // INSTANCE
const {interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // GET A LIST OF ALL ACCOUNTS
  accounts = await web3.eth.getAccounts();

  // USE ONE OF THOSE ACCOUNTS TO DEPLOY
  // THE CONTRACT
  inbox = await new web3.eth.Contract(JSON.parse(interface))  // TEACHES WEB3 ABOUT WHAT METHODS AN INBOX CONTRACT HAS
    .deploy({ data: bytecode,
    arguments: ['Hi there!'] })  // TELLS WEB3 THAT WE WANT TO DEPLOY A NEW COPY OF THIS CONTRACT
    .send({from: accounts[0], gas: '1000000' });  // INSTRUCTS WEB3 TO SEND OUT A TRANSACTION THAT CREATES THIS CONTRACT

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();;
    assert.equal(message, 'bye');
  });
});








/*   MOCHA TESTIRANJE
class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let car;

beforeEach(() => {
  car = new Car();
});

describe('Car', () => {
  it('can park', () => {

    assert.equal(car.park(), 'stopped');
  });
  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  })
});
*/
