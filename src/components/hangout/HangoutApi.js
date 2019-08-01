const getReviewsFromApi = (id) => {
      return fetch(`${remoteURL}/reviews/?_expand=hangout&hangoutId=${id}`).then(data =>
        data.json()
      );
  }