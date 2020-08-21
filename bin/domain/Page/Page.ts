type PageChild = {
  children: PageChild[];
  name: string;
};

export interface Page {
  children: PageChild[];
  name: string;
}
