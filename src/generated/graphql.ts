import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  books: Array<Book>;
  countBooks: Scalars["Int"];
  book?: Maybe<Book>;
  authors: Array<Author>;
  countAuthors: Scalars["Int"];
  author?: Maybe<Author>;
};

export type QueryBooksArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryBookArgs = {
  id: Scalars["ID"];
};

export type QueryAuthorsArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryAuthorArgs = {
  id: Scalars["ID"];
};

export type Book = {
  __typename?: "Book";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  title: Scalars["String"];
  author: Author;
};

export type Author = {
  __typename?: "Author";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  age?: Maybe<Scalars["Int"]>;
  books: Array<Book>;
};

export type Mutation = {
  __typename?: "Mutation";
  createBook: BookMutation;
  deleteBook: Scalars["Boolean"];
  updateBook: BookMutation;
  createAuthor: AuthorMutation;
  deleteAuthor: Scalars["Boolean"];
  updateAuthor: AuthorMutation;
};

export type MutationCreateBookArgs = {
  input: CreateBookInput;
};

export type MutationDeleteBookArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateBookArgs = {
  input: UpdateBookInput;
  id: Scalars["ID"];
};

export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};

export type MutationDeleteAuthorArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateAuthorArgs = {
  input: UpdateAuthorInput;
  id: Scalars["ID"];
};

export type BookMutation = {
  __typename?: "BookMutation";
  errors?: Maybe<Array<MutationError>>;
  book?: Maybe<Book>;
};

export type MutationError = {
  __typename?: "MutationError";
  field: Scalars["String"];
  error: Scalars["String"];
};

export type CreateBookInput = {
  title: Scalars["String"];
  authorId: Scalars["ID"];
};

export type UpdateBookInput = {
  title?: Maybe<Scalars["String"]>;
  authorId?: Maybe<Scalars["ID"]>;
};

export type AuthorMutation = {
  __typename?: "AuthorMutation";
  errors?: Maybe<Array<MutationError>>;
  author?: Maybe<Author>;
};

export type CreateAuthorInput = {
  name: Scalars["String"];
  age?: Maybe<Scalars["Int"]>;
};

export type UpdateAuthorInput = {
  name?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["Int"]>;
};

export type AllBooksQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type AllBooksQuery = { __typename?: "Query" } & Pick<
  Query,
  "countBooks"
> & {
    books: Array<
      { __typename?: "Book" } & Pick<
        Book,
        "id" | "title" | "createdAt" | "updatedAt"
      > & {
          author: { __typename?: "Author" } & Pick<
            Author,
            "id" | "name" | "age"
          >;
        }
    >;
  };

export const AllBooksDocument: DocumentNode<
  AllBooksQuery,
  AllBooksQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allBooks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "books" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "age" } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "countBooks" } },
        ],
      },
    },
  ],
};
