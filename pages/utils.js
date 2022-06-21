export default function Utils() {

  const generateContent = async () => {
    await fetch('/api/utils', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'generate_content'
      })
    });
  }

  const cleanDatabase = async () => {
    await fetch('/api/utils', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'clean_database'
      })
    });
  }

  return (
    <div className='mt-10 ml-20'>
      <h2 className='mb-10 text-xl'>Utils</h2>
      <div className='flex-1 mb-5'>
        <button 
          onClick={generateContent}
          className='border px-8 py-2 mt-5 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker'>
            Generate content
          </button>
      </div>
      <div className='flex-1 mb-5'>
        <button 
          onClick={cleanDatabase}
          className='border px-8 py-2 mt-5 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker'>
            Generate content
        </button>
      </div>
    </div>
  );
};
