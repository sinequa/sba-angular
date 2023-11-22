/**
 * The standard audit event types
 */
export const enum AuditEventType {
  // Should be in par with AuditEventType enum from AuditManager.cs
  None = "None",

  // WebApp event types
  Search_FirstPage = "Search_FirstPage",
  Search_Text = "Search_Text",
  Search_Refine = "Search_Refine",
  Search_Select_Item = "Search_Select_Item",
  Search_Select_Custom = "Search_Select_Custom",
  Search_Select_Concept = "Search_Select_Concept",
  Search_Select_Correction = "Search_Select_Correction",
  Search_GotoPage = "Search_GotoPage",
  Search_GotoTab = "Search_GotoTab",
  Search_DisplayResult = "Search_DisplayResult",
  Search_RemoveResult = "Search_RemoveResult",
  Search_RemoveAdvanced = "Search_RemoveAdvanced",
  Search_SavedQuery = "Search_SavedQuery",
  Search_WebService = "Search_WebService",
  Search_DidYouMean_Original = "Search_DidYouMean_Original",
  Search_DidYouMean_Correction = "Search_DidYouMean_Correction",
  Search_ExportCSV = "Search_ExportCSV",
  Search_SavedQuery_ExportCSV = "Search_SavedQuery_ExportCSV",
  Search_Selection_ExportCSV = "Search_Selection_ExportCSV",
  Search_AlertQuery = "Search_AlertQuery",
  Search_Select_AnalyticsItem = "Search_Select_AnalyticsItem",
  Search_Sort = "Search_Sort",
  Search_Exit_Logout = "Search_Exit_Logout",
  Search_Timeline_Usage = "Search_Timeline_Usage",
  Search_AutoComplete = "Search_Autocomplete",
  Search_Login_Success = "Login_Success_Form",
  Search_QueryIntent_Detected = "Search_QueryIntent_Detected",

  SavedQuery_Add = "SavedQuery_Add",
  SavedQuery_Delete = "SavedQuery_Delete",
  SavedQuery_DeleteAll = "SavedQuery_DeleteAll",
  SavedQuery_Rename = "SavedQuery_Rename",

  Alert_Edit = "Alert_Edit",
  Alert_Delete = "Alert_Delete",
  Alert_DeleteAll = "Alert_DeleteAll",

  Link_Display = "Link_Display",
  Link_Click = "Link_Click",

  Basket_Add = "Basket_Add",
  Basket_Delete = "Basket_Delete",
  Basket_DeleteAll = "Basket_DeleteAll",
  Basket_Rename = "Basket_Rename",
  Basket_AddDoc = "Basket_AddDoc",
  Basket_RemoveDoc = "Basket_RemoveDoc",
  Basket_Open = "Basket_Open",
  Basket_ExportCSV = "Basket_ExportCSV",

  Label_Add = "Label_Add",
  Label_Delete = "Label_Delete",
  Label_Rename = "Label_Rename",
  Label_Open = "Label_Open",
  Label_AddDoc = "Label_AddDoc",
  Label_RemoveDoc = "Label_RemoveDoc",
  Label_ExportCSV = "Label_ExportCSV",
  Label_Menu_ExportCSV = "Label_Menu_ExportCSV",

  Rating_Set = "Rating_Set",
  Rating_Delete = "Rating_Delete",

  Doc_Preview = "Doc_Preview",
  Doc_CacheHtml = "Doc_CacheHtml",
  Doc_CachePdf = "Doc_CachePdf",
  Doc_CacheOriginal = "Doc_CacheOriginal",
  Doc_Url1 = "Doc_Url1",
  Doc_Url2 = "Doc_Url2",
  Preview_Close = "Preview_Close",

  Click_ResultLink = "Click_ResultLink",
  Click_ResultLink1 = "Click_ResultLink1",
  Click_ResultLink2 = "Click_ResultLink2",
  Click_ResultLink3 = "Click_ResultLink3",
  Click_ResultLink4 = "Click_ResultLink4",
  Click_ResultLink5 = "Click_ResultLink5",
  Click_ResultLink6 = "Click_ResultLink6",
  Click_ResultLink7 = "Click_ResultLink7",
  Click_ResultLink8 = "Click_ResultLink8",
  Click_ResultLink9 = "Click_ResultLink9",
  Click_ResultLink10 = "Click_ResultLink10",
  Click_PreviewLink1 = "Click_PreviewLink1",
  Click_PreviewLink2 = "Click_PreviewLink2",
  Click_PreviewLink3 = "Click_PreviewLink3",
  Click_PreviewLink4 = "Click_PreviewLink4",
  Click_PreviewLink5 = "Click_PreviewLink5",
  Click_PreviewLink6 = "Click_PreviewLink6",
  Click_PreviewLink7 = "Click_PreviewLink7",
  Click_PreviewLink8 = "Click_PreviewLink8",
  Click_PreviewLink9 = "Click_PreviewLink9",
  Click_PreviewLink10 = "Click_PreviewLink10",

  RFM_ClickSet = "RFM_ClickSet",
  RFM_ClickReset = "RFM_ClickReset",
  RFM_Like = "RFM_Like",
  RFM_LikeReset = "RFM_LikeReset",
  RFM_Dislike = "RFM_Dislike",
  RFM_Important = "RFM_Important",
  RFM_ImportantReset = "RFM_ImportantReset",
  RFM_Ban = "RFM_Ban",

  Navigation_Exit = "Navigation_Exit",
  Navigation_Return = "Navigation_Return",
  Navigation_Route = "Navigation_Route",

  Answer_Display = "Answer_Display",
  Answer_Click = "Answer_Click",
  Answer_Result = "Answer_Result",
  Answer_Liked = "Answer_Liked",
  Answer_Disliked = "Answer_Disliked",
  Answer_Liked_Cancelled = "Answer_Liked_Cancelled",
  Answer_Disliked_Cancelled = "Answer_Disliked_Cancelled",

  TopPassages_Display = "TopPassages_Display",
  TopPassages_Click = "TopPassages_Click",

  UserSettings_Reset = "UserSettings_Reset",
}

/**
 * Helper type to get the values of the AuditEventType enum
 */
export type AuditEventTypeValues = `${AuditEventType}`;
