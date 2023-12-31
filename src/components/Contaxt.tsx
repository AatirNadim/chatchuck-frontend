import Avatar from "../Avatar";


interface ContactProps {
  id: string;
  username: string;
  onClick: (id: string) => void;
  selected: boolean;
  online: boolean;
}

const Contact: React.FC<ContactProps>  =({ id, username, onClick, selected, online }) => {
  return (
    <div key={id} onClick={() => onClick(id)}
         className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer m-2 font-semibold rounded-xl "+(selected ? 'bg-three' : '')}>
      {/* {selected && (
        <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
      )} */}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span className={selected ? "text-one" : "text-four"}>{username}</span>
      </div>
    </div>
  );
}

export default Contact;