// src/configs/editorConfig.ts

export const editorConfig = {
  // 기본 설정
  height: 500,
  skin: 'snow',
  icons: 'thin',
  menubar: true,
  placeholder: 'Ask a question or post an update...',

  // 모든 무료 플러그인 포함
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
    'template',
    'codesample',
    'hr',
    'pagebreak',
    'nonbreaking',
    'toc',
    'imagetools',
    'quickbars',
    'pagebreak',
  ],

  // 툴바 구성
  toolbar1:
    'undo redo | blocks fontfamily fontsize | ' +
    'bold italic underline strikethrough | forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify',

  toolbar2:
    'bullist numlist outdent indent | link image media table | ' +
    'removeformat | help | code fullscreen | pagebreak | searchreplace',

  // 추가 설정
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

  // 이미지 관련 설정
  image_advtab: true,
  image_caption: true,

  // 링크 관련 설정
  link_list: [
    { title: 'My page 1', value: 'https://www.example.com/page1' },
    { title: 'My page 2', value: 'https://www.example.com/page2' },
  ],

  // 테이블 관련 설정
  table_default_attributes: {
    border: '1',
  },
  table_default_styles: {
    'border-collapse': 'collapse',
    width: '100%',
  },

  // 툴바 빠른 삽입 설정
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
  quickbars_insert_toolbar: 'image media table',

  // auto save 설정
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
}

export default editorConfig
