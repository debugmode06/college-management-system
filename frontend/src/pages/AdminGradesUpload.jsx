import React, { useState } from "react";

export default function AdminGradesUpload() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.csv.files[0];
    
    if (!file) {
      alert('Please select a CSV file');
      return;
    }

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('csv', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/upload-grades-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        alert(`✅ Successfully uploaded ${data.count} grades!`);
      } else {
        alert(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload CSV');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 20 }}>
        📊 Bulk Upload Grades
      </h1>
      
      <div style={{ 
        background: '#f9fafb', 
        padding: 20, 
        borderRadius: 12, 
        marginBottom: 20,
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 10 }}>
          CSV Format:
        </h3>
        <pre style={{ 
          background: '#fff', 
          padding: 12, 
          borderRadius: 6,
          fontSize: '0.85rem',
          overflow: 'auto'
        }}>
{`student_id,subject_code,subject_name,semester,credits,grade,year
720824103084,24CS301,Programming in C,1,3,RA,2024
720824103084,24CY201,Chemistry,1,3,RA,2024`}
        </pre>
      </div>

      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          name="csv" 
          accept=".csv"
          required
          style={{
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: 8,
            width: '100%',
            marginBottom: 16
          }}
        />
        
        <button
          type="submit"
          disabled={uploading}
          style={{
            background: uploading ? '#9ca3af' : '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 8,
            fontSize: '1rem',
            fontWeight: 600,
            cursor: uploading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {uploading ? '⏳ Uploading...' : '📤 Upload Grades CSV'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: 20,
          padding: 20,
          background: result.success ? '#d1fae5' : '#fee2e2',
          border: `1px solid ${result.success ? '#10b981' : '#ef4444'}`,
          borderRadius: 12
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>
            {result.success ? '✅ Success!' : '❌ Error'}
          </h3>
          <p style={{ margin: 0 }}>{result.message || result.error}</p>
        </div>
      )}
    </div>
  );
}
