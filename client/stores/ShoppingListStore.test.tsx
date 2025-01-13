import { renderHook, act } from '@testing-library/react';
import {
  useAddShoppingListProductCallback,
  useDelShoppingListProductCallback,
  useShoppingListValue,
  useShoppingListProductIds,
  useShoppingListProductCount,
  useShoppingListProductCell,
  useShoppingListProductCreatedByNickname,
  useShoppingListUserNicknames,
  default as ShoppingListStore,
} from './ShoppingListStore';

import { Store } from 'tinybase';
import { createStore, setSchema } from 'tinybase';
import { createRelationships } from 'tinybase/with-schemas';

const mockStore = createStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA);
const mockRelationships = createRelationships(mockStore);
const listId = 'testListId';
const productId = 'testProductId';
const userId = 'testUserId';
const nickname = 'testNickname';

beforeEach(() => {
  mockStore.setSchema({
    products: {},
    collaborators: {},
  });
  mockStore.setRow('collaborators', userId, { nickname });
});

describe('ShoppingListStore Hooks', () => {
  test('useAddShoppingListProductCallback', () => {
    const { result } = renderHook(() =>
      useAddShoppingListProductCallback(listId)
    );

    act(() => {
      const newProductId = result.current('Apples', 5, 'kg', 'Fresh apples');
      expect(mockStore.getRow('products', newProductId)).toEqual(
        expect.objectContaining({
          name: 'Apples',
          quantity: 5,
          units: 'kg',
          notes: 'Fresh apples',
        })
      );
    });
  });

  test('useDelShoppingListProductCallback', () => {
    mockStore.setRow('products', productId, {
      id: productId,
      name: 'Bananas',
    });

    const { result } = renderHook(() =>
      useDelShoppingListProductCallback(listId, productId)
    );

    act(() => {
      result.current();
      expect(mockStore.getRow('products', productId)).toBeUndefined();
    });
  });

  test('useShoppingListValue', () => {
    const { result } = renderHook(() =>
      useShoppingListValue(listId, 'name')
    );

    act(() => {
      result.current[1]('Groceries');
      expect(result.current[0]).toBe('Groceries');
    });
  });

  test('useShoppingListProductIds', () => {
    mockStore.setRow('products', '1', { createdAt: '2025-01-01' });
    mockStore.setRow('products', '2', { createdAt: '2025-01-02' });

    const { result } = renderHook(() => useShoppingListProductIds(listId));

    expect(result.current).toEqual(['1', '2']);
  });

  test('useShoppingListProductCount', () => {
    mockStore.setRow('products', '1', {});
    mockStore.setRow('products', '2', {});

    const { result } = renderHook(() => useShoppingListProductCount(listId));

    expect(result.current).toBe(2);
  });

  test('useShoppingListProductCell', () => {
    mockStore.setRow('products', productId, { name: 'Oranges' });

    const { result } = renderHook(() =>
      useShoppingListProductCell(listId, productId, 'name')
    );

    act(() => {
      result.current[1]('Apples');
      expect(result.current[0]).toBe('Apples');
    });
  });

  test('useShoppingListProductCreatedByNickname', () => {
    mockStore.setRow('products', productId, { createdBy: userId });

    const { result } = renderHook(() =>
      useShoppingListProductCreatedByNickname(listId, productId)
    );

    expect(result.current).toBe(nickname);
  });

  test('useShoppingListUserNicknames', () => {
    const { result } = renderHook(() => useShoppingListUserNicknames(listId));

    expect(result.current).toEqual([nickname]);
  });
});

describe('ShoppingListStore Component', () => {
  test('initializes store with schema and relationships', () => {
    renderHook(() =>
      ShoppingListStore({
        listId,
        initialContentJson: JSON.stringify({}),
      })
    );
  
    // Verify that the schema is applied by checking for tables
    expect(mockStore.hasTable('products')).toBe(true);
    expect(mockStore.hasTable('collaborators')).toBe(true);
  
// Verify relationship behavior by adding data and checking its effects
mockStore.setRow('products', 'testProductId', { createdBy: userId });
expect(mockStore.getCell('collaborators', userId, 'nickname')).toBe(nickname);
});
