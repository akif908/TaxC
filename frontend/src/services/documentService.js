import api from './api';

const documentService = {
  getDocuments: () => api.get('/documents/'),

  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  downloadDocument: async (documentId) => {
    const response = await api.get(`/documents/${documentId}`, {
      responseType: 'blob',
    });
    // Create a link and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'downloaded_file';
    if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch.length === 2)
            fileName = fileNameMatch[1];
    }
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  deleteDocument: (documentId) => api.delete(`/documents/${documentId}`),
};

export default documentService;
