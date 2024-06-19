export default `
  mutation uploadFiles($input: UploadFilesInput) {
    sampleUploadFiles(input: $input) {
      items {
        full_path
        name
        order_path
        quote_path
        secret_key
      }
    }
  }
`;
