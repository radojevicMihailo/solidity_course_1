const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'cream order online cheap sorry shine seed more minute strong naive pig',
  'https://rinkeby.infura.io/v3/c28fe31ecf5d48b4905d45673a0d1d83'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode})
     .send({from: accounts[0]});

  console.log('Contract deployed to', result.options.address);
};
deploy();
