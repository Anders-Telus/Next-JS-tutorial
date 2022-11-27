export type User = {
    id: string;
    name: string;
    role: "user" | "admin" | '007' | 'ninja' | 'undercovercoder' |'sheildAgent' |'ghostWriter' | 'covert-devops'
  } 
  
  const users: User[] = [
    { id: "1", name: "Gonazalo", role: "007" },
    { id: "2", name: "Will", role: "ninja" },
    { id: "3", name: "Kashif", role: "undercovercoder" },
    { id: "4", name: "Charlotte", role: "ghostWriter" },
    { id: "5", name: "Puttaiah", role: "sheildAgent" },
    { id: "5", name: "Anders", role: "covert-devops" },
  ];
  
  export { users };
  