export const editorConfig = (isDarkMode: boolean) => ({
  // 기본 설정
  height: '84vh',
  resize: false,
  // 다크모드 조건부 적용
  skin: isDarkMode ? 'oxide-dark' : 'snow',
  content_css: isDarkMode ? 'dark' : 'default',

  content_style: `
     body { 
       font-family: Helvetica, Arial, sans-serif; 
       font-size: 14px;
       background-color: ${isDarkMode ? '#262627' : '#ffffff'};
       color: ${isDarkMode ? '#fff' : '#161616'};
     }

   `,

  menubar: true,
  placeholder: 'Ask a question or post an update...',
  z_index: 100,

  // 문제되는 플러그인들을 제외한 무료 플러그인들
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount',
    'emoticons',
    'directionality',
    'visualchars',
    'codesample',
    'pagebreak',
    'nonbreaking',
    'quickbars',
  ],

  // 나머지 설정은 동일하게 유지
  toolbar1:
    'undo redo | blocks fontfamily fontsize | ' +
    'bold italic underline strikethrough | forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify',

  toolbar2:
    'bullist numlist outdent indent | link image media table | ' +
    'removeformat | help | code fullscreen | pagebreak | searchreplace',

  image_advtab: true,
  image_caption: true,

  link_list: [
    { title: 'My page 1', value: 'https://www.example.com/page1' },
    { title: 'My page 2', value: 'https://www.example.com/page2' },
  ],

  table_default_attributes: {
    border: '1',
  },
  table_default_styles: {
    'border-collapse': 'collapse',
    width: '100%',
  },

  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
  quickbars_insert_toolbar: 'image media table',

  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
})

export default editorConfig
