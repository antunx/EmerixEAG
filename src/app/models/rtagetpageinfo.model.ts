export interface RtagetPageInfoModel {
  ErrorCode: number;
  ErrorMessage: string;
  PageId: number;
  PageTitle: string;
  PageSubTitle: string;
  PageParagraph: string;
  Items: Item[];
}

export interface Item {
  ItemId: number;
  ItemTitle: string;
  ItemSubTitle: string;
  ItemParagraph: string;
}
