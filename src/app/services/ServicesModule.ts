import {NgModule, Input} from '@angular/core';
import {CommonModule} from '@angular/common';


import { Web3Service } from './web3Service';
import { IpfsComponent} from './ipfs.component';

@NgModule({
    imports:[CommonModule],
    declarations: [],
    exports: [],
    providers:[Web3Service, IpfsComponent]
  

})
export class ServicesModule {
}
