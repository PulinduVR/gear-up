import React, { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:5000/products/upload-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setData }) => {
  const ref = useRef(null);
  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed");
  };

  const onSuccess = (res) => {
    console.log("ImageKit Response:", res);
    setData({ url: res.url });
  };
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onSuccess={onSuccess}
        onError={onError}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div
        onClick={() => ref.current.click()}
        className="p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white w-max"
      >
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
