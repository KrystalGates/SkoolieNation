const remoteURL = "http://localhost:5002";

export default Object.create(null, {
  get: {
    value: function(entity, id) {
      return fetch(`${remoteURL}/${entity}/${id}`).then(data => data.json());
    }
  },
  all: {
    value: function(entity) {
      return fetch(`${remoteURL}/${entity}`).then(data => data.json());
    }
  },
  delete: {
    value: function(id, entity) {
      return fetch(`${remoteURL}/${entity}/${id}`, {
        method: "DELETE"
      })
        .then(data => data.json())
        // .then(() => fetch(`${remoteURL}/${entity}`))
        // .then(data => data.json());
    }
  },
  post: {
    value: function(newObj, entity) {
      return fetch(`${remoteURL}/${entity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObj)
      }).then(data => data.json());
    }
  },
  put: {
    value: function(editedObj, entity) {
      return fetch(`${remoteURL}/${entity}/${editedObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedObj)
      }).then(data => data.json());
    }
  },
  getReviewsFromApi: {
    value: function(id) {
      return fetch(`${remoteURL}/reviews/?_expand=user&hangoutId=${id}`).then(
        data => data.json()
      );
    }
  },
  getDidVisitHangout: {
    value: function() {
      return fetch(`${remoteURL}/didVisits/?_expand=hangout`).then(data =>
        data.json()
      );
    }
  }
});
