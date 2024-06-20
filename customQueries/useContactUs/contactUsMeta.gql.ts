export default `
  mutation postContactUsData($input: ContactusInput!) {
    contactusFormSubmit(input: $input) {
      success_message
    }
  }
`;
