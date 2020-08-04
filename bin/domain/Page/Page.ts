type PageChild = {
  name: string;
};

export interface Page {
  name: string;
  children: PageChild[];
}
