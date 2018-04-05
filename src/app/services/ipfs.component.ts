import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ipfsAPI from 'ipfs-api';
import * as IPFS from 'ipfs';
import * as series from 'async/series';

declare var window: any;


@Injectable()
export class IpfsComponent {
  ipfs: any;
  public hashObservabel = new Subject<string>()


  constructor() { }


 str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

ab2str(file) {
    return String.fromCharCode.apply(null, new Uint16Array(file));
  }
 
  public saveData(fileRaw: any) { 
let file=this.str2ab(fileRaw);
    let node = new IPFS();
    let fileMultihash;

    series([
      (cb) => node.on('ready', cb),
      (cb) => node.version((err, version) => {
        if (err) { return cb(err) }
        console.log('Version:', version.version)
        cb()
      }),


      (cb) => node.files.add(file, (err, filesAdded) => {
        if (err) { 
          console.log(err);
          return cb(err) }

        console.log('\nAdded file:', filesAdded[0].hash);
        this.hashObservabel.next(filesAdded[0].hash);
        console.log('https://gateway.ipfs.io/ipfs/' + filesAdded[0].hash);
      //  window.open('https://gateway.ipfs.io/ipfs/' + filesAdded[0].hash);
        cb()
      })
    ])




  }
  
  }
















