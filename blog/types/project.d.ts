export interface ProjectModel {
  id: number;
  sortId: number;
  sortName?: string;
  title: string;
  introduce: string;
  url: string;
}

export interface ProjectList {
  sortId: number;
  sortName: string;
  child: ProjectModel[];
}
[];
