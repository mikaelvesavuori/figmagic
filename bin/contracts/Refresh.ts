export type RefreshConfig = {
  figmagicFolder: string;
  /**
   * @description Sets how a file is refreshed. In 'soft' mode, the previous folder is
   * renamed and placed in a Figmagic-created trash folder with an added ISO 8601 timestamp.
   * In 'hard' mode, Node's `fs` module is used to erase the folder with no way of
   * retrieving the old folder.
   */
  refreshType: RefreshType;
};

export type RefreshType = 'soft' | 'hard';
