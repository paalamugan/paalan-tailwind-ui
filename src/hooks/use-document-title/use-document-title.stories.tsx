import { useDocumentTitle } from './use-document-title';

export default {
  title: 'hooks/Utilities/useDocumentTitle',
};

export function Usage() {
  useDocumentTitle('My Page Title');
  return <div>Page content goes here</div>;
}
