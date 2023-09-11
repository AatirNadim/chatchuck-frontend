export type MessageType = {
  text : string,
  sender : string | null,
  recipient : string | null,
  _id : number,
  file : any,
}

export type FileType = {
  name : any,
  data : any
} | null;