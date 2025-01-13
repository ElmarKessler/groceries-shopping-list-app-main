# Testkonzept
Nach IEEE 829

### Introduction 
Eine plattformübergreifende Anwendung zum erstellen von Einkaufslisten, die eine Echtzeitsynchronisation ermöglicht, ohne dass die lokale Funktionalität verloren geht.

### Test Items
Getestet werden alle Funktionen die zu den Server Endpoints gehören und die Funktionen zur Erstellung der Liste(n).

### Features to be tested
#### Documents
- ShoppingListsStore.tsx
- ShoppingListStore.tsx
- ListCreationContext.tsx
- index.d.ts

#### Functions
- useAddShoppingListCallback()
- useJoinShoppingListCallback()
- useDelShoppingListCallback()
- useShoppingListIds()
- ( ShoppingListsStore() )

- useAddShoppingListProductCallback()
- useDelShoppingListProductCallback()
- useShoppingListValue()
- useShoppingListProductIds()
- useShoppingListProductCount()
- useShoppingListProductCell()
- useShoppingListProductCreatedByNickname()
- useShoppingListUserNicknames()
- ( ShoppingListStore() )

- ListCreationProvider()
- useListCreation()

-
-

### Features not to be tested
- Frontend
- Non-Functional Tests (Performance)

### Approach
In unserem Team werden wir Komponententests ausführen durch Unit Tests. Wir verwenden kein Test Driven Development, denn unser Projekt wurde vor den Tests erstellt.

### Item pass / fail criteria


