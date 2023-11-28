import { useDocumentVisibility } from './use-document-visibility';

export default {
  title: 'hooks/Utilities/useDocumentVisibility',
  component: useDocumentVisibility,
};

export function Usage() {
  const documentVisibility = useDocumentVisibility();
  return <div>Document visibility: {documentVisibility}</div>;
}
