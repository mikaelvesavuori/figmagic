let creationState = {
  hasCreatedGridPage: false,
  hasCreatedDesignTokensPage: false,
  hasCreatedSubcomponentsPage: false,
  hasCreatedComponentsPage: false,
  hasCreatedGraphicsPage: false
};

export function createPage(figmaPages) {
  let correctPage = undefined;
  let isMatchFound = false;

  function findShortenedNameMatch(originalString, matchString) {
    return originalString.toLowerCase().replace(" ", "") === matchString;
  }

  figmaPages.forEach(page => {
    if (!isMatchFound) {
      if (
        (findShortenedNameMatch(page.name, "grid") &&
          creationState.hasCreatedGridPage === false) ||
        (findShortenedNameMatch(page.name, "designtokens") &&
          creationState.hasCreatedDesignTokensPage === false) ||
        (findShortenedNameMatch(page.name, "subcomponents") &&
          creationState.hasCreatedSubcomponentsPage === false) ||
        (findShortenedNameMatch(page.name, "components") &&
          creationState.hasCreatedComponentsPage === false) ||
        (findShortenedNameMatch(page.name, "graphics") &&
          creationState.hasCreatedGraphicsPage === false)
      ) {
        isMatchFound = true;
        foundMatch(page);
      }
    }

    function foundMatch(page) {
      const fixedPageName = page.name.toLowerCase().replace(" ", "");
      if (fixedPageName === "grid") {
        creationState.hasCreatedGridPage = true;
        correctPage = page.children[0].children;
      } else if (fixedPageName === "designtokens") {
        creationState.hasCreatedDesignTokensPage = true;
        correctPage = page;
      } else if (fixedPageName === "subcomponents") {
        creationState.hasCreatedSubcomponentsPage = true;
        correctPage = page.children[0].children;
      } else if (fixedPageName === "components") {
        creationState.hasCreatedComponentsPage = true;
        correctPage = page.children[0].children;
      } else if (fixedPageName === "graphics") {
        creationState.hasCreatedGraphicsPage = true;
        correctPage = page.children[0].children;
      }
    }
  });

  return correctPage;
}
