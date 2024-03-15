export async function getAllProduct() {
  const response = await fetch(
    "https://world.openfoodfacts.org/cgi/search.pl?search_terms=*&json=1"
  );
  return await response.json();
}

export async function getSearchProduct(searchName) {
  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchName}&json=1`
  );
  return await response.json();
}

export async function viewProduct(id) {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${id}.json`
  );
  return await response.json();
}
