/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      decks {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      decks {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      decks {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck {
    onCreateDeck {
      id
      title
      subtitle
      userID
      user {
        id
        email
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck {
    onUpdateDeck {
      id
      title
      subtitle
      userID
      user {
        id
        email
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck {
    onDeleteDeck {
      id
      title
      subtitle
      userID
      user {
        id
        email
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      deckID
      deck {
        id
        title
        subtitle
        userID
        createdAt
        updatedAt
      }
      content
      contentans
      timestamp
      level
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      deckID
      deck {
        id
        title
        subtitle
        userID
        createdAt
        updatedAt
      }
      content
      contentans
      timestamp
      level
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      deckID
      deck {
        id
        title
        subtitle
        userID
        createdAt
        updatedAt
      }
      content
      contentans
      timestamp
      level
      createdAt
      updatedAt
    }
  }
`;
