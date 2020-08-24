export interface Page {
  children: PageChild[];
  name: string;
}

type PageChild = {
  children: PageChild[];
  name: string;
};
