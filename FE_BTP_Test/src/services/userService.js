export async function fetchUsers(search_criteria = '') {
  const response = await fetch('http://127.0.0.1:8000/api/btptest/usermaster_get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userid: 0, search_criteria }),
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}
