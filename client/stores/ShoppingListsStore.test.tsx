import { renderHook, act } from '@testing-library/react';
import {
  useAddShoppingListCallback,
  useJoinShoppingListCallback,
  useDelShoppingListCallback,
  useShoppingListIds,
  default as ShoppingListsStore,
} from './ShoppingListsStore';
import { createStore, Store } from 'tinybase';

const TABLES_SCHEMA = {
  lists: {
    id: { type: 'string' },
    initialContentJson: { type: 'string' },
  },
} as const;

const mockStore: Store = createStore().setSchema(TABLES_SCHEMA);

const userId = 'testUserId';
const listId = 'testListId';
const listName = 'Groceries';
const listDescription = 'Weekly shopping';
const listEmoji = '🍎';
const listColor = 'red';

beforeEach(() => {
  mockStore.setRow('lists', listId, {
    id: listId,
    initialContentJson: JSON.stringify([{}, { id: listId, name: listName, description: listDescription, emoji: listEmoji, color: listColor }]),
  });
});

describe('ShoppingListsStore Hooks', () => {
  test('useAddShoppingListCallback', () => {
    const { result } = renderHook(() => useAddShoppingListCallback());

    act(() => {
      const newListId = result.current(listName, listDescription, listEmoji, listColor);
      expect(mockStore.getRow('lists', newListId)).toEqual(
        expect.objectContaining({
          name: listName,
          description: listDescription,
          emoji: listEmoji,
          color: listColor,
        })
      );
    });
  });

  test('useJoinShoppingListCallback', () => {
    const { result } = renderHook(() => useJoinShoppingListCallback());

    act(() => {
      result.current(listId);
      expect(mockStore.getRow('lists', listId)).toEqual(
        expect.objectContaining({
          id: listId,
          initialContentJson: expect.any(String),
        })
      );
    });
  });

describe('ShoppingListsStore Component', () => {
  test('initializes store with schema', () => {
    renderHook(() => ShoppingListsStore());

    expect(mockStore.hasTable('lists')).toBe(true);
  });
});

