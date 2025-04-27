'use client';

import PropTypes from 'prop-types';
import { Alert } from 'src/utils/alert';
import { useRef, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { apiFecthPost } from 'src/utils/requests';

import { Button, CircularProgress } from '@mui/material';
import { Container, ContainerButton, Form, Image } from './styles';

export default function DragAndDrop({ defaultImage, handleClose, selectedId, profile = false }) {
  const { updateLogo } = useAuthContext();

  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ file: defaultImage, src: null });

  function openFileExplorer() {
    inputRef.current.value = '';
    inputRef.current.click();
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setImage({
          file,
          src: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleUpload() {
    if (profile) {
      setLoading(true);
      const body = new FormData();
      body.append('profilePhoto', image.file);

      try {
        const { data } = await apiFecthPost(`users/profile-photo/${selectedId}`, body);

        if (data) updateLogo(data.profilePhoto);

        setImage({ file: '', src: null });
        handleClose();
      } catch (error) {
        Alert('warning', 'Atenção!', 'Houve um erro ao realizar o upload.');
      }
      setLoading(false);
    } else {
      setLoading(true);
      const body = new FormData();
      body.append('logo', image.file);

      try {
        await apiFecthPost(`companies/logo/${selectedId}`, body);

        setImage({ file: '', src: null });
        handleClose();
      } catch (error) {
        Alert('warning', 'Atenção!', 'Houve um erro ao realizar o upload.');
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        {!image.src && !image.file ? (
          <>
            <Form onSubmit={(e) => e.preventDefault()} />

            <input
              type="file"
              ref={inputRef}
              multiple={false}
              accept="image/*"
              placeholder="fileInput"
              onChange={handleChange}
              style={{ display: 'none' }}
            />

            <p>
              <span
                tabIndex={0}
                role="button"
                onClick={openFileExplorer}
                style={{ fontWeight: 'bold', cursor: 'pointer' }}
              >
                <u>Clique aqui para selecionar uma imagem</u>
              </span>
            </p>
          </>
        ) : (
          <Image src={image.src || image.file} alt="imagem selecionada" />
        )}
      </Container>
      <ContainerButton>
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpload}
          disabled={loading || !image.file || false}
        >
          {' '}
          {loading ? <CircularProgress color="secondary" /> : 'Upload'}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setImage({ file: '', src: null })}
        >
          Limpar
        </Button>
      </ContainerButton>
    </>
  );
}

DragAndDrop.propTypes = {
  profile: PropTypes.bool,
  handleClose: PropTypes.func,
  selectedId: PropTypes.string,
  defaultImage: PropTypes.string,
};
