export interface BlogEntry {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      description: string;
    };
  }
  
  export interface HomePageProps {
    entries: BlogEntry[];
  }
  