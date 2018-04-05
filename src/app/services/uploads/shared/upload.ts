export class Upload {
    $key: string;
    file: any;
    name: any;
    url: any;
    progress: number;
    content: any; 
    createdAt: Date = new Date();
  
    constructor(file: any) {
      this.file = file;
    }
  }