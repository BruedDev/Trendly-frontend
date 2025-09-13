import styles from "./PaymentDetail.module.scss";

export default function PaymentDetailSkeleton() {
  return (
    <div className={`${styles.container} container_section`}>
      <div className={styles.paymentInformation}>
        {/* Logo skeleton */}
        <div className={styles.logoSkeleton}></div>

        {/* Form skeleton */}
        <div className={styles.formSkeleton}>
          <div className={styles.skeletonField}></div>
          <div className={styles.skeletonField}></div>
          <div className={styles.skeletonField}></div>

          {/* Select row */}
          <div className={styles.skeletonRow}>
            <div className={styles.skeletonSelect}></div>
            <div className={styles.skeletonSelect}></div>
            <div className={styles.skeletonSelect}></div>
          </div>
        </div>

        {/* Action button skeleton */}
        <div className={styles.actionSkeleton}>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>

      <div className={styles.yourProduct}>
        {/* Product item skeleton */}
        <div className={styles.productItemSkeleton}>
          <div className={styles.productImageSkeleton}></div>
          <div className={styles.productInfoSkeleton}>
            <div className={styles.productNameSkeleton}></div>
            <div className={styles.productCodeSkeleton}></div>
            <div className={styles.productCategorySkeleton}></div>
            <div className={styles.productPriceSkeleton}></div>
          </div>
        </div>

        {/* Discount section skeleton */}
        <div className={styles.discountSkeleton}>
          <div className={styles.discountInputSkeleton}></div>
          <div className={styles.discountButtonSkeleton}></div>
        </div>

        {/* Summary skeleton */}
        <div className={styles.summarySkeleton}>
          <div className={styles.summaryRowSkeleton}></div>
          <div className={styles.summaryRowSkeleton}></div>
          <div className={styles.totalRowSkeleton}></div>
        </div>
      </div>
    </div>
  );
}
