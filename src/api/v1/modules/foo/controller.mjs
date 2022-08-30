async function create(data) {
  return { method: 'create', data };
}

async function read(data) {
  return { method: 'read', data };
}

async function update(data) {
  return { method: 'update', data };
}

async function del(data) {
  return { method: 'del', data };
}

async function search(data) {
  return { method: 'search', data };
}

export default {
  create,
  read,
  update,
  del,
  search,
};
