import ApiService from './api.service';

class PostsService {
  async getPosts(params) {
    return ApiService.http.get('/posts', { params });
  }

  async getPost(id) {
    return ApiService.http.get(`/posts/${id}`);
  }

  async updatePost(id, data) {
    return ApiService.http.get(`/posts/${id}`, data);
  }

  async deletePost(id) {
    return ApiService.http.delete(`/posts/${id}`);
  }
}

export default new PostsService();
