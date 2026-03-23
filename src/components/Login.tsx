import React, { useState } from 'react';
import { authService } from '../api/auth';

const Login: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async () => {
    setLoading(true);
    try {
      const codeData = await authService.requestUserCode();
      setUserCode(codeData.userCode);
      alert(`Código: {codeData.verificationUri}`);
    } catch (error) {
      alert('Erro ao solicitar código. Verifique credenciais.');
    }
    setLoading(false);
  };

  const handleExchange = async () => {
    setLoading(true);
    try {
      await authService.exchangeToken(userCode);
      window.location.href = '/';
    } catch (error) {
      alert('Erro ao trocar token. Verifique o código.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>iFood Dashbo
