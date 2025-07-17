import React from 'react';
import styles from '../styles/pages/Mypages/Mypage.module.css';
import Header from '../components/Mypages/Header';
import PointsCard from '../components/Mypages/PointsCard';
import MembershipCard from '../components/Mypages/MembershipCard';
import TransactionHistory from '../components/Mypages/TransactionHistory';
import ProfileEdit from '../components/Mypages/ProfileEdit';
import LoginConnections from '../components/Mypages/LoginConnections';

const Mypage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.gridLayout}>
                    {/* 왼쪽 섹션 */}
                    <div className={`${styles.left} ${styles.stack}`}>
                        <div className={styles.cardRow}>
                            <PointsCard />
                            <MembershipCard />
                        </div>
                        <TransactionHistory />
                    </div>

                    {/* 오른쪽 섹션 */}
                    <div className={styles.stack}>
                        <ProfileEdit />
                        <LoginConnections />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Mypage;