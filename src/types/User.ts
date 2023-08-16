export type User ={
    id: number
    email: string
    name: string
}


export type Pagination = {
    total_pages: number;
    current_page: number;
    page_size: number;
  };
  

  
  export type UserResponse = {
    pagination: Pagination;
    users: User[];
  };