export async function insertUser({ username, address, department, loginuserid = null }) {
  const response = await fetch('http://127.0.0.1:8000/api/btptest/insert_usermasters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginuserid,
      detailsjson: [
        {
          userid: null,
          username,
          address,
          department,
        },
      ],
    }),
  });
  if (!response.ok) throw new Error('Failed to insert user');
  return response.json();
}
