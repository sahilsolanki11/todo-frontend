.pageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  font-family: 'Inter', sans-serif;
  padding: 0 16px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.title {
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input {
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #6B73FF;
  outline: none;
}

.button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #6B73FF;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: #000DFF;
}

.signupText {
  margin-top: 20px;
  text-align: center;
  color: #555;
  font-size: 14px;
}

.signupLink {
  color: #6B73FF;
  font-weight: 500;
  text-decoration: none;
}
.signupLink:hover {
  text-decoration: underline;
}
