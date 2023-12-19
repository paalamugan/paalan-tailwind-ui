import { useDocumentTitle } from './use-document-title';

export default {
  title: 'Hooks/Utilities/useDocumentTitle',
};

export function Usage() {
  useDocumentTitle('My Page Title');
  return <div>Page content goes here</div>;
}
