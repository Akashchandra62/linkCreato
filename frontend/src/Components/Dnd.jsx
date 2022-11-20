import { Stack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function Dnd({yourImage, setImage}) {
  const [preview, setPreview] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    multiple:false,
    onDrop: acceptedFiles => {
      const temp = acceptedFiles[0];
      setImage(temp);
      setPreview(
        acceptedFiles.map(upFile =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Stack className="container" w={'80%'} gap={2}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <VStack gap={2}>
          <AiOutlineCloudUpload fontSize={'5rem'} color={'blue'} />
          <Text>Drag 'n' drop Your Profile here...</Text>
        </VStack>
      </div>
      <VStack>
        {preview.map((upFile, i) => {
          return (
            <div key={i}>
              <img
                src={upFile.preview}
                style={{ border: '3px solid #CCC' }}
                alt="preview"
              />
            </div>
          );
        })}
      </VStack>

      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </Stack>
  );
}

export default Dnd;
