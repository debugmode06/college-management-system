import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function ArrearPreparation() {
  const { subjectCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const subjectName = location.state?.subjectName || "Subject";
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch(`http://localhost:5000/api/arrear-questions/${subjectCode}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setQuestions(data.questions || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
  }, [subjectCode]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: '#fff', minHeight: '100vh' }}>
        Loading questions...
      </div>
    );
  }

  return (
    <div style={{ padding: 40, background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <button 
          onClick={() => navigate('/student/arrears')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#3b82f6',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to Arrears
        </button>
        
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          padding: 40,
          borderRadius: 16,
          marginBottom: 32,
          color: '#fff'
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 8, opacity: 0.9 }}>
            {subjectCode}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 12, margin: 0 }}>
            {subjectName}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, margin: 0 }}>
            📝 Previous year arrear exam questions with detailed answers
          </p>
        </div>
        
        {questions.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 80, 
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>📭</div>
            <h3 style={{ fontSize: '1.5rem', color: '#6b7280' }}>
              No questions available yet for this subject
            </h3>
            <p style={{ color: '#9ca3af', marginTop: 8 }}>
              Questions will be added soon
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {questions.map((q, idx) => (
              <div key={q.id} style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
                  <span style={{ 
                    fontWeight: 700, 
                    color: '#fff',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    padding: '6px 16px',
                    borderRadius: 8,
                    fontSize: '0.95rem'
                  }}>
                    Question {idx + 1}
                  </span>
                  <div style={{ display: 'flex', gap: 12, fontSize: '0.85rem', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>📅 {q.year}</span>
                    <span style={{ 
                      background: q.difficulty === 'easy' ? '#d1fae5' : q.difficulty === 'hard' ? '#fee2e2' : '#fef3c7',
                      color: q.difficulty === 'easy' ? '#065f46' : q.difficulty === 'hard' ? '#991b1b' : '#92400e',
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}>
                      {q.difficulty}
                    </span>
                    <span style={{ 
                      background: '#e0e7ff',
                      color: '#3730a3',
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}>
                      {q.marks} marks
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  marginBottom: 20, 
                  color: '#1f2937',
                  lineHeight: 1.6
                }}>
                  {q.question_text}
                </div>
                
                {q.answer_text && (
                  <details style={{ marginTop: 16 }}>
                    <summary style={{ 
                      cursor: 'pointer', 
                      color: '#3b82f6', 
                      fontWeight: 700,
                      fontSize: '1rem',
                      padding: '12px 0',
                      listStyle: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      <span>💡</span> View Answer
                    </summary>
                    <div style={{ 
                      marginTop: 16, 
                      padding: 20, 
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
                      borderRadius: 12,
                      border: '2px solid #bfdbfe',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                      color: '#1e40af',
                      fontFamily: 'monospace',
                      fontSize: '0.95rem'
                    }}>
                      {q.answer_text}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
