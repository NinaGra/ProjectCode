


import { Injectable, Component } from '@angular/core';
import * as metaCoin_artifacts from '../../../build/contracts/MetaCoin.json';
import * as contract from 'truffle-contract';
// const Web3 = require('web3');
import * as Web3 from 'web3/src';



declare var window: any;


@Injectable()
export class Web3Service {
  web3: any;
  MetaCoin: any;
  defaultAccount: any;
  constructor() {


    // web3= new Web3(Web3.givenProvider || "ws://localhost:8545");
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      //  Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

      if (this.web3.eth.currentProvider.connected) {
        console.log(this.web3.eth.accounts);
        console.log(this.web3.eth.getAccounts())


        console.log("Web3 inected");
        this.web3.eth.defaultAccount = this.web3.eth.getAccounts[0];
        this.defaultAccount = this.web3.eth.defaultAccount;
        this.MetaCoin = contract(metaCoin_artifacts);
        this.MetaCoin.setProvider(this.web3.currentProvider);



        this.web3.eth.getAccounts((er, r) => {
          console.log(r.length);
          if (r.length != 0)
            this.defaultAccount = r[0];
          this.web3.eth.defaultAccount = this.defaultAccount;
        })

      
        
        console.log(this.web3.eth.currentProvider);
        console.log(this.web3.eth.defaultAccount);

      }
    }

  }


  // import { Injectable } from '@angular/core';
  // import Web3 from 'web3';
  // import { default as contract } from 'truffle-contract';
  // import { Subject } from 'rxjs/Rx';
  // import requestLEI_artifacts from '../../../build/contracts/RequestLEI.json';
  // import requestLoan_artifacts from '../../../build/contracts/LoanRequest.json';
  // import { dashCaseToCamelCase } from '@angular/compiler/src/util';
  // import { Updatable } from '../updatable';
  // import Http from '@angular/common/http';
  // import * as cors from 'cors';


  // declare let window: any;

  // @Injectable()
  // export class Web3Service {
  //   public web3: Web3;
  //   public RequestLoan: any;
  //   private RequestLEI: any;
  //   private defaultAccount: string;
  //   private accounts: string[];
  //   public accountsObservable = new Subject<string[]>();
  //   public eventObservable = new Subject<string[]>();

  //   public updatables: Updatable[];


  //   constructor() {
  //     // console.log('Web3Service Constructor');
  //     this.updatables = new Array(5);
  //     this.bootstrapWeb3();
  //     // console.log(this.web3);
  //     this.RequestLoan = contract(requestLoan_artifacts);
  //     this.RequestLoan.setProvider(this.web3.currentProvider);
  //     this.RequestLEI = contract(requestLEI_artifacts);
  //     this.RequestLEI.setProvider(this.web3.currentProvider);
  //     this.watchEvents();
  //   }

  //   public bootstrapWeb3() {
  //     // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  //     if (typeof window.web3 !== 'undefined') {
  //       // Use Mist/MetaMask's provider
  //       this.web3 = new Web3(window.web3.currentProvider);
  //     } else {
  //       // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
  //       Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
  //       // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //       this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

  //     }

  //     setInterval(() => this.refreshAccounts(), 1000);
  //     setInterval(() => this.update(), 500);

  //   }

  //   private refreshAccounts() {
  //     this.web3.eth.getAccounts((err, accs) => {
  //       // console.log('Refreshing accounts');
  //       if (err != null) {
  //         console.warn('There was an error fetching your accounts.');
  //         return;
  //       }

  //       if (accs.length === 0) {
  //         console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
  //         return;
  //       }

  //       if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
  //         console.log('Observed new accounts');
  //         console.log(accs);
  //         this.accountsObservable.next(accs);
  //         this.accounts = accs;
  //         this.defaultAccount = accs[0];
  //       }
  //     });

  //   }



  //   async getCreditRequestConditions(_crID) {
  //     // console.log('Getting CreditRequestConditions!');
  //     let result =
  //       this.RequestLoan.deployed()
  //         .then(function(instance) {
  //           return instance.getCreditRequestConditions(_crID)
  //         });
  //     return result;
  // }


  //   watchEvents(): any {
  //     if (!this.RequestLoan) {
  //       console.log('LoanRequestContract not loaded.');
  //       return;
  //     }
  //     let events;
  //     let self = this;
  //     try {
  //       this.RequestLoan.deployed()
  //         .then(instance => {
  //           events = instance.allEvents();

  //           events.watch((error, result) => {

  //             if (error) {
  //               console.log(error);
  //             }
  //             else {
  //               console.log('Event: ');
  //               console.log(result);
  //               let comp;
  //               if(result.args.crID!=undefined){                
  //               comp = [result.event, result.args.crID.toString()];
  //               }
  //               else {
  //                 comp=[result.event]; 
  //               }
  //               self.eventObservable.next(comp);
  //               // for (let i = 0; i < this.updatables.length; i++) {
  //               //   if (this.updatables[i] != undefined) {
  //               //     //  console.log(this.updatables[i]);
  //               //     this.updatables[i].openSnackBar("you have new messages", "");
  //               //   }
  //               // }
  //             }
  //           });
  //         });
  //     }

  //     catch (e) {
  //       console.log(e);
  //     }
  //     return events;
  // }

}