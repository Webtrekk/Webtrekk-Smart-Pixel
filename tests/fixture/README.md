# Fixture service

Read JSON files and provide data via supervised Agent.

Usage
```elixir
Fixture.data()
Fixture.data("users")
Fixture.data("products", 2) # 2 is the index of the product list
Fixture.data("products", "id", 22)
Fixture.data("products", "Category", "Shoes")
```



