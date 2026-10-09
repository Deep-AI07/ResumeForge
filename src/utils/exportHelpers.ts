import { ResumeData } from '../types/resume';

/**
 * Downloads resume data as a formatted JSON document.
 */
export function exportResumeAsJSON(resumeData: ResumeData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
  const downloadAnchor = document.createElement('a');
  const sanitizedName = resumeData.personal.fullName.replace(/\s+/g, '_').toLowerCase() || 'draft';
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `resume_${sanitizedName}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Reads and parses an uploaded JSON file into ResumeData.
 */
export function importResumeFromJSON(
  file: File,
  onSuccess: (data: ResumeData) => void,
  onError: (errorMessage: string) => void
): void {
  const fileReader = new FileReader();
  fileReader.readAsText(file, 'UTF-8');
  fileReader.onload = (event) => {
    try {
      const content = event.target?.result as string;
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object' && parsed.personal && parsed.skills) {
        onSuccess(parsed as ResumeData);
      } else {
        onError('Uploaded file does not match the valid ResumeForge schema.');
      }
    } catch {
      onError('Error parsing JSON file. Please provide a valid .json file.');
    }
  };
  fileReader.onerror = () => {
    onError('Failed to read the selected file.');
  };
}

/**
 * Initiates the browser print dialog for PDF export.
 */
export function printResume(): void {
  window.print();
}
